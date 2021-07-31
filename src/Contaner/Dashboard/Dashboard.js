import React, { useState, useEffect } from 'react'
import classses from './Dashboard.module.css';
import axiosInstance from '../../Helper/axiosInstance';
const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalBoyes, setTotalBoyes] = useState(0);
    const [totalGirls, setTotalGirls] = useState(0);

    useEffect(() => {
        GetStudentCount()
    }, []);
    const GetStudentCount = async () => {
        const Students = await axiosInstance().get('student/count');
        if (Students && Students.data) {
            setTotalStudents(Students.data.totalStudents);
            setTotalBoyes(Students.data.totalBoyes);
            setTotalGirls(Students.data.totalGirls);
        }
    }
    GetStudentCount();
    return <div className={classses.dashboardContainer}>
        <div className={classses.blocks}>
            <div className={classses.header}>Student</div>
            <div className={classses.fieldsBlock}>
                <div className={classses.field} >Total Student : </div>
                <div className={classses.value}>{totalStudents}</div>
            </div>
            <div className={classses.fieldsBlock}>
                <div className={classses.field}>Total Girls :</div>
                <div className={classses.value}>{totalGirls}</div>
            </div>
            <div className={classses.fieldsBlock}>
                <div className={classses.field}>Total Boyes :</div>
                <div className={classses.value}>{totalBoyes}</div>
            </div>
        </div>
    </div >
}
export default Dashboard;
