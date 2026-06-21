export interface KeycloakPayload {
  realm_access?: {
    roles: string[];
  };
}
