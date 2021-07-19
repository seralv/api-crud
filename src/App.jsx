import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Person from './components/Person'
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';

const App = () => {

  const [ persons, setPersons ] = useState( [] )
  const [ newName, setNewName ] = useState( '' )
  const [ newLastName, setNewLastName ] = useState( '' )
  const [ passId, setPassId ] = useState( 0 )
  const [ btnState, setBtnState ] = useState( true )

  const getPersons = () => {
    personService
      .getAll()
      .then( initialPersons => {
        setPersons( initialPersons )
      } )
  }

  useEffect(() => {
    getPersons()
  }, [])

  const addName = ( event ) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      last_name: newLastName
    }

    if ( btnState ) {
      addPerson( personObject )
    } else {
      persons.forEach( person => {
        if ( person.id === passId ) {
          if ( window.confirm( `Are you sure to update ${ newName }` ) ) {
            updatePerson( person, personObject )
            setBtnState( true )
          }
        }
      } )
    }
  }

  const addPerson = personObject => {
    console.log('In addPerson :>> ');
    personService
      .create( personObject )
      .then( returnedPerson => {
        setPersons( persons.concat( returnedPerson ) )
        setNewName( '' )
        setNewLastName( '' )
      } )
  }

  const removePerson = id => {
    const person = persons.find( p => p.id === id )
    if ( window.confirm( `Are you sure to remove ${ person.name }` ) ) {
      personService
        .remove( person.id )
        .then( deletedPerson => {
          getPersons()
        } )
    }
  }

  const removeAllPersons = () => {
    if ( 'Are you sure to delete all persons' ) {
      personService
        .removeAll()
        .then( initialPersons => {
          setPersons( initialPersons )
        } )      
    }
  }

  const updatePerson = ( person, personObject ) => {
    console.log('In updatePerson :>> ');
    const personChanged = { ...person, name: newName, last_name: newLastName }

    personService
      .update( person.id, personChanged )
      .then( returnedPerson => {
        setPersons( persons.map( person => person.id !== personObject.id ? person : returnedPerson ) )
        setNewName( '' )
        setNewLastName( '' )
        getPersons()
      } )
  }

  const fillPerson = id => {
    const person = persons.find( p => p.id === id )
    setBtnState( !btnState )
    setNewName( person.name )
    setNewLastName( person.last_name )
    setPassId( person.id )
  }

  const handleInputName = event => {
    setNewName( event.target.value )
  }
  
  const handleInputLastName = event => {
    setNewLastName( event.target.value )
  }

  return(
    <Container maxWidth = "sm">
      <form>
        <Grid container spacing = { 1 }>
          <Grid item xs = { 6 }>
            <TextField 
              variant = "standard"
              label = "New name"
              name = "newName"
              value = { newName }
              onChange = { handleInputName }
              fullWidth
            />
          </Grid>
          <Grid item xs = { 6 }>
            <TextField 
              variant = "standard"
              label = "New last name"
              name = "newLastName"
              value = { newLastName }
              onChange = { handleInputLastName }
              fullWidth
            />
          </Grid>
          <Grid item xs = { 12 }>
            <Button 
              className = "button"
              type = "submit"
              variant = "contained"
              color = "primary"
              fullWidth
              onClick = { addName }>
              { btnState ? 'Add new person' : 'Update person' }
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />
      <Grid>
        <Grid item xs = { 12 }>
          <TableContainer component = { Paper }>
            <Table size = "small">
              <TableHead>
                <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  persons.map( person => 
                    <Person 
                      key = { person.id } 
                      person = { person } 
                      removePerson = { () => removePerson( person.id ) } 
                      updatePerson = { () => fillPerson( person.id ) }
                    /> )
                }
              </TableBody>
            </Table>  
          </TableContainer>          
        </Grid>
      </Grid>
      <br/>
      <Grid>
        <Grid item xs = { 12 }>
          {
            persons.length > 0
              ? <Button 
                  className = "button"
                  type = "submit"
                  variant = "contained"
                  color = "secondary"
                  fullWidth
                  onClick = { removeAllPersons }>
                  Clear table
                </Button>
              : null
          }          
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;