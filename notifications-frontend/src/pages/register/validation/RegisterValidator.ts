import * as yup from "yup";

export const registerFormValidator = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite o e-mail corretamente").required("O e-mail é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
});