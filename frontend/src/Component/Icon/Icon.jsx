export const SearchIcon = ({ width = "30px", height = "30px", className }) => (
  <svg height={height} viewBox="0 0 19 19" width={width} className={className}>
    <g fill-rule="evenodd" stroke="none" stroke-width="1">
      <g transform="translate(-1016 -32)">
        <g>
          <g transform="translate(405 21)">
            <g transform="translate(611 11)">
              <path d="m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z"></path>
              <path d="m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z"></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const IconClose = ({
  width = "2.4rem",
  height = "2.4rem",
  className,
}) => (
  <svg
    className={className}
    fill="currentColor"
    color="inherit"
    fontSize="inherit"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <path d="M33.2 36.02a1 1 0 0 0 1.4 0l1.42-1.42a1 1 0 0 0 0-1.4l-9.2-9.2 9.2-9.2a1 1 0 0 0 0-1.4l-1.41-1.42a1 1 0 0 0-1.42 0L24 21.17l-9.2-9.2a1 1 0 0 0-1.4 0l-1.42 1.42a1 1 0 0 0 0 1.42l9.2 9.19-9.2 9.2a1 1 0 0 0 0 1.4l1.41 1.42a1 1 0 0 0 1.42 0l9.19-9.2 9.2 9.2Z"></path>
  </svg>
);

export const IconMenu = ({
  width = "1.4rem",
  height = "1.4rem",
  className,
}) => (
  <svg width={width} height={height} viewBox="0 0 12 10" class={className}>
    <g fill-rule="evenodd" stroke="none" stroke-width="1">
      <g transform="translate(-373 -208)">
        <g transform="translate(155 191)">
          <g transform="translate(218 17)">
            <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
            <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
            <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export const FailIcon = ({
  width = "1.4rem",
  height = "1.4rem",
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 512"
  >
    <path d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
  </svg>
);
