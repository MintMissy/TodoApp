import PageNavigation from './navigation/PageNavigation';

export default function Layout(props) {
  return (
    <div>
      <PageNavigation />
      <main>{props.children}</main>
    </div>
  );
}
