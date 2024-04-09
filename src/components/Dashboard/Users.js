import React, { useState, useEffect } from 'react';
import {Typography, Container, Grid, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import NavBar from './navBar';

function Users() {
  const [users, setUsers] = useState([]);
  const [userIdCounter, setUserIdCounter] = useState(1); // Inicializamos el contador de ID en 1

  const [editingUser, setEditingUser] = useState(null);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  const saveEdit = async () => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      setEditingUser(null);
      getUsers();
    } catch (error) {
      console.error('Error al guardar la edición del usuario:', error);
    }
  };

  const addUser = async () => {
    if (newUser.name.trim() !== '' && newUser.email.trim() !== '' && newUser.password.trim() !== '') {
      try {
        const response = await fetch('http://localhost:8000/api-auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...newUser,
            id: userIdCounter
          }),
        });
        const data = await response.json();
        setUsers([...users, data]);
        setNewUser({
          name: '',
          email: '',
          password: ''
        });
        console.log(users); 
      } catch (error) {
        console.error('Error al agregar usuario:', error);
      }
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Obtener el token de autorización del almacenamiento local
  
      const response = await fetch('http://localhost:8000/api-auth/profile/allusers/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
  
      const usersData = await response.json(); // Convertir la respuesta a formato JSON
  
      setUsers(usersData); // Actualizar el estado de los usuarios con los datos recibidos
  
      console.log('Usuarios obtenidos correctamente:', usersData);
  
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };
  
  return (
    <div>
      <NavBar/>
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={addUser}>Agregar Usuario</Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {users.map((user) => (
            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent>
                  {editingUser && editingUser.id === user.id ? (
                    <React.Fragment>
                      <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={editingUser.name}
                        onChange={handleEditInputChange}
                      />
                      <TextField
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        value={editingUser.email}
                        onChange={handleEditInputChange}
                      />
                      <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={editingUser.password}
                        onChange={handleEditInputChange}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography variant="h6" gutterBottom>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Correo Electrónico: {user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contraseña: {user.password}
                      </Typography>
                    </React.Fragment>
                  )}
                </CardContent>
                <CardActions>
                  {editingUser && editingUser.id === user.id ? (
                    <React.Fragment>
                      <Button size="small" onClick={cancelEdit}>Cancelar</Button>
                      <Button size="small" onClick={saveEdit}>Guardar</Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Button size="small" onClick={() => editUser(user)}>Editar</Button>
                      <Button size="small" onClick={() => deleteUser(user.id)}>Eliminar</Button>
                    </React.Fragment>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Users;