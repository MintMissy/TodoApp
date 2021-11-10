import PageNavigation from './PageNavigation';

export default function Layout(props) {
  return (
    <div>
      <PageNavigation />
      <main>{props.children}</main>
    </div>
  );
}
