import React from 'react'
import { Accordion, Button } from 'react-bootstrap'
import './Student.css';
import { getStudentAverageGrade } from '../../service/studentService'

export default function Student({ student }) {
    const [averageResult, setAverageResult] = React.useState('');

    async function getAndDisplayAverage() {
        const averageObj = await getStudentAverageGrade(student.id)
        const averageString = `${averageObj.average.toPrecision(3)}%`;

        setAverageResult(averageString);
    }

    return (
        <Accordion className='student-accordian' defaultActiveKey="0">
            <Accordion.Item>
                <Accordion.Header>
                    <h5>{`${student.name} (${student.id})`}</h5>
                </Accordion.Header>
                <Accordion.Body>
                    <table className='student-info-table'>
                        <tbody>

                            <tr>
                                <td className='info-cell'>
                                    <div>
                                        <h4>Personal Information</h4>
                                        <p> <strong> Age: </strong> {student.age}</p>
                                    </div>
                                </td>
                                <td className='info-cell'>
                                    <div className='course-grades-table'>
                                        <h4>Grades</h4>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='course-table-header'>Course</th>
                                                    <th>Current Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.entries(student.courseGrades).map(([course, grade]) => {
                                                        return (
                                                            <tr key={`${course}-${student.id}`}>
                                                                <td>{course}</td>
                                                                <td className='grade-cell'>{`${grade}%`}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                                <td className='info-cell'>
                                    <div className='text-center'>
                                        <h4 className='average-title'>Average</h4>
                                        <h5>{averageResult}</h5>
                                        <Button onClick={getAndDisplayAverage}>Calculate Average</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='student-btn-container'>
                        <Button variant='danger'>Delete</Button>
                        <Button variant='warning'>Edit</Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
