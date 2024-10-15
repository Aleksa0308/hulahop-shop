import React from "react";
import * as Yup from "yup";
import ModalComponent from "../../../components/ModalComponent";
import { RequestWithdrawalContainer } from "./styled";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { commonAddUpdateQuery } from "../../../utils/axiosInstance";
import { ErrorTaster, SuccessTaster } from "../../../components/Toast";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";

const RequestWithdrawal = ({ isOpen, toggle, userData, refresh, wallet }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      withdrawalAmount: "",
      loading: false,
    },
    validationSchema: Yup.object({
      withdrawalAmount: Yup.number()
        .min(1, "Withdrawal amount must be greater than 0")
        .required("Please enter the withdrawal amount"),
    }),
    onSubmit: async (values) => {
      if (parseInt(wallet) <= 0) {
        ErrorTaster("Transaction is not allowed!");
        return;
      }
      const decoded = jwtDecode(ACCESS_TOKEN);
      formik.setFieldValue("loading", true);
      const response = await commonAddUpdateQuery(
        "associate_withdrawn_request",
        {
          user_id: parseInt(decoded.id),
          amount: values.withdrawalAmount,
          status: false,
        }
      );
      formik.setFieldValue("loading", false);
      if (response) {
        const { message } = response.data;
        SuccessTaster(message);
        toggle();
        refresh();
        formik.resetForm();
      }
    },
  });

  return (
    <ModalComponent size="l" open={isOpen} handleClose={toggle}>
      <RequestWithdrawalContainer>
        <div className="modal-title">{t("Request Withdrawn")}</div>
      </RequestWithdrawalContainer>
      <form onSubmit={formik.handleSubmit} className="form mt-4">
        <InputComponent
          label="Enter withdrawal amount"
          fullWidth
          InnerPlaceholder="Enter value"
          name="withdrawalAmount"
          formik={formik}
          disabled={formik.values.loading}
        />
        <Row className="g-3 mt-2">
          <Col md={6} lg={6} sm={6}>
            <ButtonComponent
              variant="outlined"
              size="large"
              text={t("BACK")}
              width="100%"
              onClick={toggle}
              disabled={formik.values.loading}
            />
          </Col>
          <Col md={6} lg={6} sm={6}>
            <ButtonComponent
              type="submit"
              variant="contained"
              width="100%"
              text={t("Withdraw")}
              loading={formik.values.loading}
            />
          </Col>
        </Row>
      </form>
    </ModalComponent>
  );
};

export default RequestWithdrawal;
