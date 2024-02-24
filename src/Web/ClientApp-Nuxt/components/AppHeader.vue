<template>
   <Navbar expand="lg" className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
    <Container type="fluid">
          <NavbarBrand to="/">CleanArchitecture.Web</NavbarBrand>
          <NavbarToggler className="mr-2" />
          <NavbarCollapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
            <NavbarNavList margin="e-auto b-2 b-lg-0">
              <NavItem>
                <NavLink className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem>
                <a className="nav-link text-dark" href="/Identity/Account/Manage">Account</a>
              </NavItem>
            </NavbarNavList>
          </NavbarCollapse>
        </Container>
        </Navbar>
</template>