import PageNavigation from './PageNavigation';

function Layout(props) {
  return (
    <div>
      <PageNavigation />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
