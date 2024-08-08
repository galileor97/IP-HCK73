import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Link } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent'
import api from '../helper/api'

const GalleryPage = () => {

    const [images, setImages] = useState([])

    const getAllImage = async () => {
        try {
            const { data } = await api({
                url: '/images',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            setImages(data)
        } catch (error) {
            console.log(error);
            console.log(error.response);
        }
    }

    useEffect(() => {
        getAllImage();
    }, []);
    return (
        <>
            <Card className="max-w-full texture lg:px-24" radius='none'>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl pb-3">Images Gallery </p>
                        <p className="text-small text-default-500">Omni-Zero: A diffusion pipeline for zero-shot stylized portrait creation.</p>
                    </div>
                </CardHeader>

            </Card>

            <div className='grid justify-center gap-y-6 mx-auto lg:grid-cols-4 lg:px-20 py-10'>
                {
                    images.data?.map(image => {
                        return (
                            <CardComponent key={image.id} image={image} />
                        )
                    })
                }

            </div>
        </>
    )
}

export default GalleryPage