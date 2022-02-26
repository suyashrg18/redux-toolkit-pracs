import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Please wait..",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-fa29b-default-rtdb.firebaseio.com/reduxcart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Could not send the cart data");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success !",
          message: "Data sent successfully",
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error !",
          message: "Could not send cart data",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-fa29b-default-rtdb.firebaseio.com/reduxcart.json"
      );
      if (!response.ok) {
        throw new Error("Could not get the cart data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartdata = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartdata.items || [],
          totalQuantity: cartdata.totalQuantity,
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error !",
          message: "Could not get cart data",
        })
      );
    }
  };
};
