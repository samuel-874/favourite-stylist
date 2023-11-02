import { Outlet } from "react-router-dom"
import { useState } from "react";
import { Card, Loader } from "../../general/GeneralComponents";
import logo from "../../assets/app_logo.png";
import { Img, StyledSignin } from "./signin/Signin.styles";
import linkedgroup from "../../assets/group.png"
import { useAppSelector } from "../../redux/hooks/hooks";
import { Auth0Provider } from '@auth0/auth0-react';

export const Forms = () => {

    return (
      <div>

            <StyledSignin>
              <section>
              <Img width={"50px"} height={"60px"} src={logo} />
              <p>Welcome back, Curly Sister is always here for you.</p>
              <div style={{backgroundImage:`url(${linkedgroup})`,backgroundSize:"100% 100%"}}>
              </div>
              </section>
              <main>
                <Outlet />
              </main>
            </StyledSignin>
          <Loader />
          { <Card /> }
        </div>
    )
}