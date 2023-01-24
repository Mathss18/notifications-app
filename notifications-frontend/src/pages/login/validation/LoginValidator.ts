import * as yup from "yup";

export const loginFormValidator = yup.object().shape({
    email: yup.string().email("Digite o e-mail corretamente").required("O e-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});