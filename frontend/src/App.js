import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import DashboardRevenueScreen from "./screens/admin/DashboardRevenueScreen";
import DashboardProductScreen from "./screens/admin/DashboardProductScreen";
import ProductCreateScreen from "./screens/admin/ProductCreateScreen";
import ShopScreen from "./screens/ShopScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import CartPreview from "./components/Drawer/CartPreview";
import SnackbarMessage from "./components/SnackbarMessage";
import MessengerChat from "./components/MessengerChat";
import ReceptScreen from "./screens/admin/ReceptScreen";
import ReceptDetailScreen from "./screens/admin/ReceptDetailScreen";
import ReceptPlaceOrderScreen from "./screens/admin/ReceptPlaceOrderScreen";
import VerifyScreen from "./screens/VerifyScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AdminLoginScreen from "./screens/admin/LoginScreen";
import Error from "./screens/NotFoundScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import CategoryCreateScreen from "./screens/CategoryCreateScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminLoginScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/verify" component={VerifyScreen} exact />
        <Route path="/forgot-password" component={ForgotPasswordScreen} exact />
        <Route>
          <Header />
          <main className="main">
            <Route path="/shop" component={ShopScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Switch>
              <Route
                path="/admin/product/create"
                component={ProductCreateScreen}
              />
              <Route path="/admin/product/:id" component={ProductEditScreen} />
            </Switch>
            <Route path="/admin/categorylist" component={CategoryListScreen} />
            <Switch>
              <Route
                path="/admin/category/create"
                component={CategoryCreateScreen}
              />
              <Route
                path="/admin/category/:id"
                component={CategoryEditScreen}
              />
            </Switch>
            <Route
              path="/admin/dashboard-revenue"
              component={DashboardRevenueScreen}
            />
            <Route
              path="/admin/dashboard-product"
              component={DashboardProductScreen}
            />
            <Route path="/admin/productlist" component={ProductListScreen} />

            <Route path="/admin/user/:id" component={UserEditScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/change-password" component={ChangePasswordScreen} />
            <Route path="/admin/recept" component={ReceptScreen} />
            <Route path="/admin/receptDetail" component={ReceptDetailScreen} />
            <Route
              path="/admin/receptPlaceOrder"
              component={ReceptPlaceOrderScreen}
            />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/search" component={HomeScreen} exact />
            <Route path="/" component={HomeScreen} exact />
          </main>
          <Footer />
          <CartPreview />
          <SnackbarMessage />
          <MessengerChat />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
