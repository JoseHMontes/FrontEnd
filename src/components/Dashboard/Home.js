import React from 'react';
import NavBar from './navBar';
import { Card, CardContent, Grid, Typography } from '@mui/material';
function Home(){
  return (
    <div style={{ padding: '20px' }}>
        <NavBar/>
      <Grid container spacing={3}>
        {/* Card de obras */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Obras
              </Typography>
              <Typography>
                - Obra 1
                <br />
                - Obra 2
                <br />
                - Obra 3
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Estado de Avance del Proyecto
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Equipo Encargado
              </Typography>
              <Typography>
                - Nombre del equipo
                <br />
                - Miembro 1
                <br />
                - Miembro 2
                <br />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export  default Home;


