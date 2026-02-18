const LoginForm = ( props ) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={props.loginHandler}>
      <div>
        Username:
        <input
          data-testid='username'
          type='text'
          value={props.username}
          name='Username'
          onChange={({ target }) => props.usernameHandler(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          data-testid='password'
          type='password'
          value={props.password}
          name='Password'
          onChange={({ target }) => props.passwordHandler(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  </div>
)

export default LoginForm
