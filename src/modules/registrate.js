import mainpage from './mainpage';
const registrate = () => {
    let btn_reg = document.querySelector('#regbtn');
    const emailfield = document.querySelector('.email-filed-div');
    const input_email = emailfield.querySelector('input[name="logines"]');
    const btn_authreg = document.querySelector('.login100-form-btn');
    const title = document.querySelector(".login100-form-title");
    const formg = document.querySelector('.login100-form');

    const error = document.querySelector('.alert-danger');

    const registrateForm = () => {
        if (title.innerHTML === "Авторизация") {
            try {
                error.remove();
            } catch (e) {}
            input_email.setAttribute('data-validate', "Некорректный Email");
            input_email.placeholder = 'Email';
            btn_authreg.textContent = "Зарегистрироваться";
            title.innerHTML = "Регистрация";
            formg.setAttribute("action", "/api/user");

            btn_reg.innerHTML = 'Авторизоваться <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>';

            emailfield.insertAdjacentHTML('beforebegin', `
                    <div class="registration-dannie">
                        <div class="login-filed-div wrap-input100 validate-input" data-validate="Некорректный логин">
                            <input class="input100" type="text" name="login" placeholder="Логин" oninput="this.value=this.value.replace(/[^A-Za-z0-9\s]/g,'');">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="ima-filed-div wrap-input100 validate-input" data-validate="Некорректное имя">
                            <input class="input100" type="text" name="ima" placeholder="Имя" oninput="this.value=this.value.replace(/[^а-яА-Я]/g,'');">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div class="fam-filed-div wrap-input100 validate-input" data-validate="Некорректная фамилия">
                            <input class="input100" type="text" name="fam" placeholder="Фамилия" oninput="this.value=this.value.replace(/[^а-яА-Я]/g,'');">
                            <span class="focus-input100"></span>
                            <span class="symbol-input100">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
            `);
        } else {
            try {
                error.remove();
            } catch (e) {}
            input_email.removeAttribute('data-validate');
            input_email.placeholder = 'Email/Логин';
            btn_authreg.textContent = "Авторизоваться";
            formg.setAttribute("action", "/api/login");
            title.innerHTML = "Авторизация";
            btn_reg.innerHTML = 'Создать аккаунт <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>';
            const d = document.querySelector(".registration-dannie");
            d.remove();
        }
    }

    btn_reg.addEventListener('click', registrateForm);
}

export default registrate;