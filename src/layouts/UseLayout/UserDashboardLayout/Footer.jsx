import { Container, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <footer>
            <Paper sx={
                {
                    marginTop: 5,
                    background: '#011627',
                    height: '200px',
                    width:"100%",
                    color:"#fff",
                    borderTop:"2px solid #fff"
                }
            }
            square elevation={0}>
                <Container>
                    <Toolbar>
                        <Typography variant="body1" color="inherit">
                            © 2021 HDD
                        </Typography>
                    </Toolbar>
                </Container>
            </Paper>
        </footer>
    );
}

export default Footer;