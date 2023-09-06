import axios from "axios";

const PUBLIC_API = axios.create({
  baseURL: "http://13.233.225.191:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

const FORM_API = axios.create({
  baseURL: "http://65.1.109.223:4000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// register user
export async function registerUser(user) {
  try {
    const {
      firstName,
      lastName,
      username,
      phoneNumber,
      hash,
      city,
      fcm_token,
    } = user;
    console.log(JSON.stringify(user));
    const response = await PUBLIC_API.post(`/users/register`, {
      firstName,
      lastName,
      username,
      phoneNumber,
      hash: "",
      city,
      fcm_token,
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
}

//
export async function saveFcmToken(email, token) {
  try {
    const response = await PUBLIC_API.post(`/users/fcm_token`, {
      username: email,
      fcm_token: token,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

//
export async function createRequest(orderRequest) {
  const {
    username,
    pickup_text_address,
    destination_text_address,
    pickup_latitude,
    pickup_longitude,
    destination_latitude,
    destination_longitude,
    destination_date,
    destination_time,
    bags_image,
    number_of_bags,
    destination_changed = false,
    requested_dropoff = false,
  } = orderRequest;
  try {
    const response = await PUBLIC_API.post("/users/create_request", {
      username,
      pickup_text_address,
      destination_text_address,
      pickup_latitude,
      pickup_longitude,
      destination_latitude,
      destination_longitude,
      destination_date,
      destination_time,
      bags_image,
      number_of_bags,
      destination_changed,
      requested_dropoff,
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
}

//
export async function placeNewOrder(requestId) {
  try {
    const response = await PUBLIC_API.post("/users/place_order", {
      request_id: requestId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

//
export async function pastOrders(username) {
  try {
    const response = await PUBLIC_API.post("/users/past_orders_users", {
      username,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

//
export async function updateRequest(orderRequest) {
  const {
    request_id,
    destination_text_address,
    destination_latitude,
    destination_longitude,
    destination_changed = true,
    requested_dropoff = false,
  } = orderRequest;
  try {
    const response = await PUBLIC_API.post("/users/create_request", {
      request_id,
      destination_text_address,
      destination_latitude,
      destination_longitude,
      destination_changed,
      requested_dropoff,
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
}

export async function orderDetails(requestId) {
  try {
    const response = await PUBLIC_API.post("users/user_check_ride_status", {
      request_id: requestId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function requestDropOff(requestId) {
  try {
    const response = await PUBLIC_API.post("users/request_dropoff", {
      request_id: requestId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
