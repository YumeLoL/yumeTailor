import Layout from '@/components/Layout'
import { IJob } from '@/models/job'
import router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getJobDetail } from '../api/httpRequest'

interface JobIdProps {
  jobId: string
}
const JobDetailPage = () => {
  const router = useRouter()
  const {jobId} = router.query
  const[jobData, setJobData] = React.useState<IJob>()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobDetail(jobId as string);
        if (response.data.status === 200) {
          setJobData(response.data.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, [jobId]);
  
  

  return (
    <Layout>

    </Layout>
  )
}

export default JobDetailPage
