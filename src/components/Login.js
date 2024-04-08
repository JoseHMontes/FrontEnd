import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    justifyContent: "center",
    backgroundColor: "#2196f3",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: theme.spacing(2),
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function Users() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [setResponse] = React.useState("");

  const handleLogin = () => {
    const url = "https://dummyjson.com/auth/login";
    const loginData = {
      username: username,
      password: password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la solicitud.");
        }
        return res.json();
      })
      .then((data) => {
        setResponse(JSON.stringify(data));

        console.log(
          "Usuario autenticado. Redirigiendo a la página de dashboard..."
        );
      })
      .catch((error) => {
        setResponse("Error: " + error.message);
      });
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.form}>
          <Typography variant="h5" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <TextField
            label="Usuario"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </div>
      </Container>
    </div>
  );
}

function UsersWithThemeProvider() {
  return (
    <ThemeProvider theme={theme}>
      <Users />
    </ThemeProvider>
  );
}

export default UsersWithThemeProvider;
