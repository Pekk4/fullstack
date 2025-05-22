interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;
