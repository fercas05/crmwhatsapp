import React, { useState, useEffect } from "react";
import qs from 'query-string'
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import usePlans from '../../hooks/usePlans';
import { i18n } from "../../translate/i18n";
import { FormControl } from "@material-ui/core";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import Autocomplete from "@material-ui/lab/Autocomplete";
// const Copyright = () => {
// 	return (
// 		<Typography variant="body2" color="textSecondary" align="center">
// 			{"Copyleft "}
// 			<Link color="inherit" href="https://github.com/canove">
// 				Canove
// 			</Link>{" "}
// 			{new Date().getFullYear()}
// 			{"."}
// 		</Typography>
// 	);
// };
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    companyName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    password: Yup.string().min(5, "Too Short!").max(50, "Too Long!"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
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
    const handleLinkRecovery = async values => {
        try {
            await openApi.post("/auth/forgotPass", values);
            toast.success(i18n.t("forgotPass.toasts.success"));
            history.push("/login");
        } catch (err) {
            toastError(err);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {i18n.t("forgotPass.title")}
                </Typography>
                {/* <form className={classes.form} noValidate onSubmit={handleSignUp}> */}
                <Formik
                    initialValues={user}
                    enableReinitialize={true}
                    validationSchema={UserSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            handleLinkRecovery(values);
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
                                        id="email"
                                        label={i18n.t("forgotPass.form.email")}
                                        name="email"                                        
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        autoComplete="email"
                                        inputProps={{ style: { textTransform: 'lowercase' } }}
                                    />
                                </Grid>
                                {/* TOKEN */}
                                {/* <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="token"
                                        label={i18n.t("auth.token")}
                                        name="token"
                                        autoComplete="token"
                                    />
                                </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                {i18n.t("forgotPass.buttons.submit")}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link
                                        href="#"
                                        variant="body2"
                                        component={RouterLink}
                                        to="/login"
                                    >
                                        {i18n.t("signup.buttons.login")}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Box mt={5}>{/* <Copyright /> */}</Box>
        </Container>
    );
};
export default SignUp;