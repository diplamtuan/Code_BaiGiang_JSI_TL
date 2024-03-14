import { auth, dangky, dangnhap } from "./firebaseConfig.js";

const loginBtn = document.querySelector("#btnLogin");

loginBtn.addEventListener("click", async function () {
  let email = document.querySelector("#form2Example17");
  let pass = document.querySelector("#form2Example27");
  const { isSuccess, infoMessage } = await dangky(
    auth,
    email.value,
    pass.value
  );
  if (isSuccess) {
    alert("Đăng ký thành công");
  } else {
    if (infoMessage == "auth/missing-password") {
      pass.classList.add("errorPass");
    }
  }
});
