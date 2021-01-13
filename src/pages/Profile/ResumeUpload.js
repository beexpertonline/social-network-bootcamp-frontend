import { useMutation } from "@apollo/client";
import { uploadFile } from "api/file";
import { PencilIcon } from "components/icons";
import { Spacing } from "components/Layout";
import { GET_AUTH_USER, UPDATE_USER_RESUME } from "graphql/user";
import React, { useCallback, useMemo } from "react";
import { useStore } from "store";
import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 14px;
  cursor: pointer;
  transition: background-color 0.1s;
  font-weight: ${(p) => p.theme.font.weight.bold};
  border-radius: ${(p) => p.theme.radius.lg};
  background-color: ${(p) => p.theme.colors.grey[100]};
  font-size: ${(p) => p.theme.font.size.xxs};

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[300]};
  }
`;

/**
 * Component for uploading post image
 */
const ResumeUpload = () => {
  const [{ auth }] = useStore();

  const updateUserResume = useMutation(UPDATE_USER_RESUME, {
    refetchQueries: [{ query: GET_AUTH_USER }],
  });

  const handleUploadPDF = useCallback(
    async (event) => {
      const file = event.target.files[0];
      const filename = `${auth.user.id}_${file.name}`;
      const resume = await uploadFile(filename, file);
      await updateUserResume({ variables: { input: { resume } } });
    },
    [auth.user, updateUserResume]
  );

  const label = useMemo(
    () => (auth?.user?.resume ? "Update Resume" : "Upload Resume"),
    [auth.user]
  );

  return (
    <>
      <Input
        name="resume"
        onChange={handleUploadPDF}
        type="file"
        id="resume-file"
        accept="application/pdf"
      />

      <Label htmlFor="resume-file">
        <PencilIcon />

        {label && <Spacing left="xs">{label}</Spacing>}
      </Label>
    </>
  );
};

export default ResumeUpload;
