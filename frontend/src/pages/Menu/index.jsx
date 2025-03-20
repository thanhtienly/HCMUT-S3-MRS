import styles from "./styles.scss";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);
function Menu() {
  return (
    <section class="py-3 py-md-5">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className={cx("wrapper_title")}>
              <h2 class="mb-4 mb-md-5 text-center">Menu page</h2>
            </div>
            <hr class="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Menu;
