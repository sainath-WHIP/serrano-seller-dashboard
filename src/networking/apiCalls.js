import axios from "axios";

const ApiGet = async (api) => {
  try {
    const data = await fetch(api,{
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      },
      credentials: 'include'
    });
    console.log("apiget fun response ", data);
    return data;
  } catch (error) {
    console.log("catch error apiget ", error);
  }
};

const ApiPost = async (api, body) => {
  try {
    // const { data } = await axios.post(api, body, { withCredentials: true });
    const datas = await fetch(api,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    // const response = await datas.json();
    console.log("api post status code ", datas.status);
    return datas;
  } catch (error) {
    console.log("catch error api post ", error);
  }
};

const ApiPut = async (api, body) => {
  try {
    const data = await fetch(api,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
    console.log("api post status code ", data.status);
    return data;
  } catch (error) {
    console.log("catch error api post ", error);
  }
};

export { ApiGet, ApiPost, ApiPut };
