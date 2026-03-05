import { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  type ContactPayload,
  submitContact,
} from "../features/contact-us/service";
import dogImg from "../../public/image.png";

type FormValues = ContactPayload;

const schema: yup.ObjectSchema<FormValues> = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().trim().required("Name is required"),
  message: yup.string().trim().required("Message is required"),
});

const ContactPage = () => {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues = useMemo<FormValues>(
    () => ({ email: "", name: "", message: "" }),
    [],
  );

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: schema,
    validateOnMount: true,
    onSubmit: async (values, helpers) => {
      setError(null);

      const payload: ContactPayload = {
        email: values.email.trim(),
        name: values.name.trim(),
        message: values.message.trim(),
      };

      try {
        await submitContact(payload);
        setDone(true);
        helpers.resetForm();
      } catch (e: any) {
        setError(
          e?.response?.data?.detail ||
            "Something went wrong. Please try again.",
        );
      }
    },
  });

  const canSubmit = formik.isValid && formik.dirty && !formik.isSubmitting;

  return (
    <div className="min-vh-100 d-flex">
      <Card className="flex-fill border-0 rounded-0 shadow-sm">
        <Row className="g-0 h-100">
          <Col
            lg={8}
            className="p-5 d-flex flex-column justify-content-center"
            style={{ background: "#eef2f7" }}
          >
            <div
              className="text-center"
              style={{ maxWidth: 560, margin: "0 auto" }}
            >
              <h1
                style={{ fontWeight: 700, color: "#1f2d4d", marginBottom: 12 }}
              >
                Contact Dog Selector today
              </h1>

              <div
                className="text-muted"
                style={{ fontSize: 13, marginBottom: 24 }}
              >
                Discover how Dog Selector can help you save time and bring joy.
              </div>

              <Card className="border-0 shadow-sm" style={{ borderRadius: 8 }}>
                <Card.Body className="d-flex align-items-center gap-3">
                  <img
                    src={dogImg}
                    alt="dog"
                    className="rounded-circle"
                    style={{
                      width: 84,
                      height: 84,
                      objectFit: "cover",
                      flexShrink: 0,
                      border: "3px solid #fff",
                    }}
                  />

                  <div className="text-start">
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1f2d4d",
                      }}
                    >
                      Hi, I am Woof, your dog selector specialist.
                    </div>
                    <div
                      className="text-muted"
                      style={{ fontSize: 12, lineHeight: 1.4 }}
                    >
                      Please tell us more about your needs so that we can find
                      the right fit for you.
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <div
                className="d-flex justify-content-center gap-4 mt-3 text-muted"
                style={{ fontSize: 12 }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: "#0d6efd" }}>✈</span>
                  Capterra 4.9
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span style={{ color: "#fd7e14" }}>💬</span>
                  Software advice 4.9
                </div>
              </div>
            </div>
          </Col>

          <Col
            lg={4}
            className="p-5 bg-white d-flex flex-column justify-content-center border-start"
          >
            {done ? (
              <div className="h-100 d-flex align-items-center">
                <Alert
                  className="mb-0 w-100"
                  style={{
                    background: "#d1e7dd",
                    border: "0",
                    color: "#0f5132",
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 16 }}>
                    Thank you for contacting us.
                  </div>
                  <div style={{ fontSize: 13 }}>
                    We'll get back to you soon.
                  </div>

                  <div className="mt-3">
                    <Button
                      variant="success"
                      onClick={() => {
                        setDone(false);
                        setError(null);
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                </Alert>
              </div>
            ) : (
              <>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: 12, fontWeight: 600 }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      name="email"
                      placeholder="Type here"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.touched.email && formik.errors.email)
                      }
                      autoComplete="email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: 12, fontWeight: 600 }}>
                      Name
                    </Form.Label>
                    <Form.Control
                      name="name"
                      placeholder="Type here"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={!!(formik.touched.name && formik.errors.name)}
                      autoComplete="name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: 12, fontWeight: 600 }}>
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      placeholder="Type here"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        !!(formik.touched.message && formik.errors.message)
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={!canSubmit}>
                    {formik.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactPage;
