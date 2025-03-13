import React, { useState, useEffect } from "react";
import qs from "query-string";

import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import backgroundStep from "../../assets/backgroundStep2.png";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        CRM WhatsApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    "&.MuiButton-root": {
      margin: "20px 0px 16px",
      backgroundColor: "rgb(52, 137, 255)",
      borderRadius: " 30px",
    },

    "&:hover": {
      backgroundColor: "#7946d1",
      boxShadow: "none",
    },

    backgroundColor: "rgb(52, 137, 255)",
    margin: theme.spacing(3, 0, 2),
    WebkitTextFillColor: "#FFF",
  },
}));

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "¡Demasiado corto!")
        .max(50, "¡Demasiado tiempo!")
        .required("Requerido"),
    companyName: Yup.string()
        .min(2, "¡Demasiado corto!")
        .max(50, "¡Demasiado tiempo!")
        .required("Requerido"),
    password: Yup.string().min(5, "¡Demasiado corto!").max(50, "¡Demasiado tiempo!"),
    email: Yup.string().email("Inválido email").required("Requerido"),
    phone: Yup.string().required("Requerido"),
});

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();
    const { getPlanList } = usePlans()
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false);

    let companyId = null
    const params = qs.parse(window.location.search)
    if (params.companyId !== undefined) {
        companyId = params.companyId
    }

    const initialState = { name: "", email: "", password: "", phone: "", companyId, companyName: "", planId: "" };

    const [user] = useState(initialState);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const planList = await getPlanList({listPublic: "false"});

            setPlans(planList);
            setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignUp = async values => {
        try {
            await openApi.post("/auth/signup", values);
            toast.success(i18n.t("signup.toasts.success"));
            history.push("/login");
        } catch (err) {
            toastError(err);
        }
    };


  return (
  <>
    <div className="geral-signup">
      <div className="container-signup">
        <div className="paper">
          <img src={logo} alt="Whats" className="img-logo-signup" />
          <h4 className="h4">⚡ Registro</h4>
          <div>
            <span className="span">
              👋🏻 Comienza tu <b>Prueba GRATIS</b> de 14 días de CRM WhatsApp en solo 3 pasos!{" "}
              <b>No te preocupes, no te pedimos los datos de tu tarjeta.</b> 💳
            </span>
          </div>

          <Formik
            initialValues={user}
            enableReinitialize={true}
            validationSchema={UserSchema}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                handleSignUp(values);
                actions.setSubmitting(false);
              }, 400);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      id="companyName"
                      label={i18n.t("signup.form.company")}
                      error={touched.companyName && Boolean(errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                      name="companyName"
                      autoComplete="companyName"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      autoComplete="name"
                      name="name"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      fullWidth
                      id="name"
                      label={i18n.t("signup.form.name")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      id="email"
                      label={i18n.t("signup.form.email")}
                      name="email"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      autoComplete="email"
                      inputProps={{ style: { textTransform: 'lowercase' } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      name="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      label={i18n.t("signup.form.password")}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label={i18n.t("signup.form.phone")}
                      name="phone"
                      autoComplete="phone"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputLabel htmlFor="plan-selection">Plan</InputLabel>
                    <Field
                      as={Select}
                      variant="outlined"
                      fullWidth
                      id="plan-selection"
                      name="planId"
                      required
                    >
                      {plans.map((plan, key) => (
                        <MenuItem key={key} value={plan.id}>
                          {plan.name} - Agentes: {plan.users} - Conexiones: {plan.connections} - Departamentos: {plan.queues} - CHL {plan.amount}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {i18n.t("signup.buttons.submit")}
                </Button>

                <Grid container>
                  <Grid item>
                    <Link href="#" variant="body2" component={RouterLink} to="/login">
                      {i18n.t("signup.buttons.login")}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>

        <div className="footer">
          <p className="p">
            Copyright ©{" "}
            <a href="#" target="_blank" rel="noopener noreferrer">
              CRM WhatsApp
            </a>{" "}
            2024
          </p>

          <p className="p">
            Este sitio está protegido por reCAPTCHA Enterprise y Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Política de Privacidad
            </a>{" "}
            y{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              Términos de Servicio
            </a>
          </p>
        </div>
      </div>

      <div className="container-img-signup">
        <div className="img-signup"></div>
      </div>
    </div>
  </>
);

};

export default SignUp;
