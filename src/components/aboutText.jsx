import { Link } from "react-router-dom";

export function About() {
    return(
        <div className="row">
            <div className="col-md-6">
                <h1 className="p-1 pt-3">About HoliDaze</h1>
                <p className="p-1">
                HoliDaze is an innovative travel and accommodation booking platform designed to make your holiday planning seamless and enjoyable. Our platform functions as your one-stop destination for discovering, booking, and managing your dream vacations. With HoliDaze, you can easily browse a wide range of accommodations, from cozy cottages to luxurious resorts, and tailor your trip to your specific preferences Whether you're planning a relaxing beach getaway, an adventurous mountain retreat, or a cultural city escape, HoliDaze is here to help you create unforgettable travel memories.
                </p>
            </div> 
            <div className="col-md-6">
                <h2 className="p-1 pt-4">Customers</h2>
                <p className="p-1">Customers on HoliDaze can browse our website and book a venue that suits their preferences. They can update their profile, view venues and manage their own bookings.</p>
                <h2 className="p-1 pt-4">Managers</h2>
                <p className="p-1">Managers can enjoy all the same functionality as other customers. The difference is that once registered as a manager, you can also post you own accomodation venues. These are easy to manage with fast access to delete and update pages.</p>
            </div>
            <div className="mt-3">
                <h3>Register now!</h3>
                <Link to='/register/login' className="btn btn-primary m-auto">Register</Link>
            </div>
            
        </div>
        
    )
}