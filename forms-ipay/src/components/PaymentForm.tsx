import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { budgetPaymentCategories, nonBudgetPaymentCategories } from "./constants";

const PaymentFormSchema = Yup.object().shape({
    edrpou: Yup.string()
        .required("Введіть ЄДРПОУ чи РНОКПП")
        .min(8, "ЄДРПОУ повинно містити не менш ніж 8 символів")
        .max(10, "ЄДРПОУ повинно містити максимум 10 символів"),
    recipientName: Yup.string()
        .required("Введіть назву одержувача")
        .min(3, "Найменування одержувача повинно містити не менш ніж 3 символи"),
    iban: Yup.string()
        .required("Введіть IBAN рахунок отримувача")
        .matches(/^UA\d{27}$/, "Поле р/р або IBAN невірне"),
    paymentCategory: Yup.string().required("Оберіть категорію платежу"),
    paymentPurpose: Yup.string().required("Вкажіть призначення переказу"),
    senderFullName: Yup.string().required("Необхідно заповнити 'ПІБ відправника'"),
    phoneNumber: Yup.string()
        .required("Введіть номер телефону")
        .matches(/^[0-9]{10}$/, "Номер телефону повинен містити 10 цифр"),
    amount: Yup.number()
        .required("Вкажіть суму")
        .min(10, "Мінімальна сума – 10 грн")
        .max(29000, "Максимальна сума – 29000 грн"),
    cardNumber: Yup.string()
        .required("Необхідно заповнити номер картки")
        .matches(/^[0-9]{16}$/, "Номер картки повинен містити 16 цифр"),
    expiryDate: Yup.string()
        .required("Введіть строк дії картки")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Невірний термін дії картки"),
    cvv: Yup.string()
        .required("Введіть CVV")
        .matches(/^[0-9]{3}$/, "CVV2/CVC2 введено невірно"),
});

const PaymentForm: React.FC = () => {
    const calculateComission = (amount: number) => {
        return amount <= 10 ? 0 : amount * 0.02 + 4;
    };

    const calculateTotal = (amount: number, comission: number) => {
        return amount <= 10 ? 0 : amount + comission;
    };

    return (
        <Formik
            initialValues={{
                edrpou: "",
                recipientName: "",
                iban: "UA",
                paymentCategory: "",
                paymentPurpose: "",
                budgetPayment: false,
                senderFullName: "",
                phoneNumber: "",
                amount: 0,
                cardNumber: "",
                expiryDate: "",
                cvv: "",
            }}
            validationSchema={PaymentFormSchema}
            onSubmit={(values) => {
                console.log("Form data", values);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="container mt-4" style={{ maxWidth: "700px" }}><h2>Оплата рахунку за реквізитами</h2>
                    <p className="m-0">На цій сторінці ви можете зробити переказ на реквізити будь-якої компанії України.</p>
                    <p className="m-0">Кошти буде зараховано наступного банківського дня.</p>
                    <h5>Одержувач</h5>
                    <div className="form-floating mb-3">
                        <Field
                            name="edrpou"
                            className="form-control"
                            placeholder="Введіть ЄДРПОУ чи РНОКПП"
                            type="number"
                        />
                        <label htmlFor="edrpou">ЄДРПОУ або РНОКПП</label>
                        <ErrorMessage name="edrpou" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="recipientName"
                            className="form-control"
                            placeholder="Введіть назву одержувача"
                        />
                        <label htmlFor="edrpou">Назва одержувача</label>
                        <ErrorMessage name="recipientName" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="iban"
                            id="iban"
                            className="form-control"
                            placeholder="Введіть IBAN рахунок отримувача"
                            maxLength="29"
                            value={values.iban}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("iban", "UA" + e.target.value.replace(/\D/g, ""))}
                        />
                        <label htmlFor="edrpou">Рахунок IBAN</label>
                        <ErrorMessage name="iban" component="div" className="text-danger" />
                    </div>
                    <h5>Категорія платежу</h5>
                    <div className="mb-3">
                        <div className="form-check">
                            <Field
                                type="checkbox"
                                name="budgetPayment"
                                id="budgetPayment"
                                className="form-check-input"
                            />
                            <div className="d-flex flex-column">
                                <label className="form-check-label" htmlFor="budgetPayment">Бюджетний платіж</label>
                                <label className="form-check-label small" htmlFor="budgetPayment">(Податки, штрафи та інші платежі до бюджету)</label>
                            </div>
                        </div>
                        <Field
                            as="select"
                            name="paymentCategory"
                            className="form-select mt-2"
                        >
                            {
                                (values.budgetPayment ? budgetPaymentCategories : nonBudgetPaymentCategories)
                                    .map(c =>
                                        <option key={c.value} value={c.value}>{c.name}</option>
                                    )
                            }
                        </Field>
                        <ErrorMessage name="paymentCategory" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="paymentPurpose"
                            className="form-control"
                            placeholder="Вкажіть призначення переказу"
                            component="textarea"
                        />
                        <label htmlFor="edrpou">Призначення платежу</label>
                        <ErrorMessage name="paymentPurpose" component="div" className="text-danger" />
                    </div>
                    <h5>Відправник</h5>
                    <div className="form-floating mb-3">
                        <Field
                            name="senderFullName"
                            className="form-control"
                            placeholder="Прізвище Ім'я По-батькові"
                        />
                        <label htmlFor="senderFullName">ПІБ відправника</label>
                        <ErrorMessage name="senderFullName" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="phoneNumber"
                            className="form-control"
                            placeholder="Введіть ваш номер телефону"
                            type="text"
                            maxLength={10}
                        />
                        <label htmlFor="phoneNumber">Номер телефону</label>
                        <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                    </div>
                    <div className="card p-2">
                        <div className="form-floating mb-3">
                            <Field
                                name="amount"
                                className="form-control"
                                placeholder="Сума"
                                type="number"
                                min="10"
                                max="29000"
                            />
                            <label htmlFor="amount">Сума (10 - 29000 грн)</label>
                            <ErrorMessage name="amount" component="div" className="text-danger" />
                        </div>
                        <div className="mb-3">
                            <p>Комісія 2% + 4 грн: {(calculateComission(values.amount || 0)).toFixed(2)} грн</p>
                            <strong>До сплати: {calculateTotal(values.amount || 0, calculateComission(values.amount || 0)).toFixed(2)} грн</strong>
                        </div>
                    </div>
                    <h5>Карткові дані</h5>
                    <div className="form-floating mb-3">
                        <Field
                            name="cardNumber"
                            className="form-control"
                            placeholder="Номер картки"
                            type="text"
                            maxLength={16}
                        />
                        <label htmlFor="cardNumber">Номер картки (16 цифр)</label>
                        <ErrorMessage name="cardNumber" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="expiryDate"
                            className="form-control"
                            placeholder="MM/YY"
                        />
                        <label htmlFor="expiryDate">Строк дії картки (MM/YY)</label>
                        <ErrorMessage name="expiryDate" component="div" className="text-danger" />
                    </div>
                    <div className="form-floating mb-3">
                        <Field
                            name="cvv"
                            className="form-control"
                            placeholder="CVV"
                            type="password"
                            maxLength={3}
                        />
                        <label htmlFor="cvv">CVV (3 цифри)</label>
                        <ErrorMessage name="cvv" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Сплатити
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default PaymentForm;
