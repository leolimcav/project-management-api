import Administrator from "@models/Administrator"

export const buildAdministratorMock = () => {
  const administrator = new Administrator();
  Object.assign(administrator, {
    id: "valid_uuid",
    email: "validemail@email.com",
    name: "name",
    password: "password",
    role: "role",
    created_at: new Date(),
    updated_at: new Date
  });

  return administrator;
}
