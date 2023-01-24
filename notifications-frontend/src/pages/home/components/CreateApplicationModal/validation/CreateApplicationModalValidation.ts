import * as yup from "yup";

export const createApplicationModalValidator = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
});