export interface Permission {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Permissions {
  fog: Permission;
  images: Permission;
  drawing: Permission;
  ruler: Permission;
  pointer: Permission;
  text: Permission;
}
