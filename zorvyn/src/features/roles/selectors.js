const selectIsAuthenticated = (state) => state.role.isAuthenticated;
const selectRole = (state) => state.role.role;
const selectUsername = (state) => state.role.username;

export { selectIsAuthenticated, selectRole, selectUsername };
