import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext"

type Props = {
  component: React.ReactNode;
  redirect: string
}

export const RouteAuthGuard: React.FC<Props> = (props) => {
  const { isAuth, setIsAuth } = useAuth()

  if (!isAuth) {
    return <Navigate to={props.redirect} state={{from:useLocation()}} replace={false} />
  }

  return <>{props.component}</>;

}