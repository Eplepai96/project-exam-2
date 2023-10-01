import '../scss/components/footer.scss'

export const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="bg-light">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HoliDaze</p>
          <p className='pb-2'>Email: contact@holidaze.com</p>
        </div>
      </div>
    </footer>
  );
}

