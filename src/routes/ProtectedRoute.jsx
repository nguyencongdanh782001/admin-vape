import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const ProtectedRoute = ({ children }) => {
    const { currentUser, isLoading, error } = useSelector(state => state.user)
    return (
        <>
            {
                isLoading
                    ? (<Loading />)
                    : error === ''
                        ? currentUser.isAdmin === true
                            ?
                            <>
                                <Topbar />
                                <div style={{ display: 'flex', marginTop: '10px' }}>
                                    <Sidebar />
                                    {children}
                                </div>
                            </>
                            : <Navigate to='/login' />
                        : <Navigate to='/login' />
            }
        </>
    )
}

export default ProtectedRoute
