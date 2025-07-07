import e from "express";

interface User {
  id: String;
  name: String;
  email: String;
  category: String;
}

const createTokenUser = (admin: User) => {
  return {
    adminId: admin.id,
    name: admin.name,
    email: admin.email,
    category: admin.category,
  };
};

export default createTokenUser;
