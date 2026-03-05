import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useMemo } from "react";
import { useFormik } from "formik";
import type { Dog, DogStatus, UUID } from "../../types/dogs";

import * as yup from "yup";

export const STATUSES = ["PENDING", "ACCEPTED", "REJECTED"] as const;
export type StatusValue = (typeof STATUSES)[number];

const STATUS_LABEL: Record<StatusValue, string> = {
  PENDING: "Pending",
  ACCEPTED: "Approved",
  REJECTED: "Rejected",
};

export type EditDogFormValues = {
  status: StatusValue;
  note: string;
};

type Props = {
  show: boolean;
  dog: Dog | null;
  onClose: () => void;
  onSave: (dogId: UUID, payload: { status: DogStatus; note: string }) => void;
  saving: boolean;
};

const EditDogOffcanvas = ({ show, dog, onClose, onSave, saving }: Props) => {
  const initialValues = useMemo<EditDogFormValues>(
    () => ({
      status: (dog?.status ?? "PENDING") as EditDogFormValues["status"],
      note: dog?.note ?? "",
    }),
    [dog],
  );

  const editDogSchema: yup.ObjectSchema<EditDogFormValues> = yup.object({
    status: yup
      .mixed<StatusValue>()
      .oneOf([...STATUSES])
      .required("Please select a status."),
    note: yup.string().trim().required("Mandatory field cannot stay empty."),
  });

  const toDogStatus = (v: StatusValue): DogStatus => {
    return v;
  };

  const formik = useFormik<EditDogFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: editDogSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      if (!dog) return;
      onSave(dog.id, {
        status: toDogStatus(values.status),
        note: values.note.trim(),
      });
    },
  });

  useEffect(() => {
    if (!show) formik.resetForm();
  }, [show]);

  const canSubmit = show && !!dog && formik.isValid && formik.dirty && !saving;

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      style={{ width: "min(420px, 100vw)" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Edit</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {dog && (
          <div className="mb-3 p-2 bg-light rounded">
            <div className="d-flex gap-3">
              <div className="fw-bold" style={{ width: 110 }}>
                Breed
              </div>
              <div>{dog.breed.name}</div>
            </div>
            <div className="d-flex gap-3">
              <div className="fw-bold" style={{ width: 110 }}>
                Description
              </div>
              <div>{dog.description.title}</div>
            </div>
          </div>
        )}

        <Form noValidate onSubmit={formik.handleSubmit}>
          <div className="mb-2 fw-bold">Change status</div>

          <div className="mb-3">
            {STATUSES.map((s) => (
              <Form.Check
                key={s}
                type="radio"
                id={`status-${s}`}
                name="status"
                label={STATUS_LABEL[s]}
                value={s}
                checked={formik.values.status === s}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!(formik.touched.status && formik.errors.status)}
              />
            ))}

            <Form.Control.Feedback type="invalid" className="d-block">
              {formik.touched.status && formik.errors.status
                ? formik.errors.status
                : null}
            </Form.Control.Feedback>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">
              Note - Why did you change status?*
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              name="note"
              placeholder="Type here"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={!!(formik.touched.note && formik.errors.note)}
              maxLength={500}
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.note}
            </Form.Control.Feedback>

            <div className="text-muted mt-1" style={{ fontSize: 12 }}>
              {formik.values.note.length}/500
            </div>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={!canSubmit}>
            Save changes
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default EditDogOffcanvas;
