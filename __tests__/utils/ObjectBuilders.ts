import { Chance } from "chance";
import Administrator from "@models/Administrator";

const chance = Chance();

export const buildAdministratorMock = () => {
  const administrator = new Administrator();
  Object.assign(administrator, {
    id: "valid_uuid",
    email: "validemail@email.com",
    name: chance.name(),
    password: chance.string(),
    role: "Administrator",
    created_at: new Date(),
    updated_at: new Date(),
  });

  return administrator;
};
