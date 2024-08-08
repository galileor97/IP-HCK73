import React, { useState } from 'react'
import { Button, Chip } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";



const handleGenerate = async () => {
    console.log('hello');
}


const DashboardPage = () => {

    const [generatedImage, setGeneratedImage] = useState('')
    return (
        <>
            <Card className="max-w-full texture lg:px-24" radius='none'>
                <div></div>
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-2xl pb-3">Omni-Zero [v1] </p>
                        <p className="text-small text-default-500">Omni-Zero: A diffusion pipeline for zero-shot stylized portrait creation.</p>
                    </div>
                </CardHeader>
                <div className='flex gap-x-2'>
                    <Chip className='ml-2' color="success" variant="bordered">Fast Result</Chip>
                    <Chip color="primary" variant="dot">Public</Chip>
                </div>
                <CardBody>
                    <Link
                        isExternal
                        showAnchorIcon
                        href="https://github.com/okaris/omni-zero.git"
                    >
                        Visit on GitHub.
                    </Link>
                </CardBody>

            </Card>
            <Divider />
            <div className='grid gap-y-5 lg:grid-cols-2 lg:px-24 lg:py-7 gap-x-10'>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
                        <p className="text-tiny uppercase font-bold pb-5">Input</p>
                        <Card className='w-full texture p-5' isBlurred>
                            <CardHeader className='px-4 flex-col items-start'>
                                <h4 className="font-bold text-md">Upload</h4>
                                <small className="text-default-500">Upload the requirement files</small>
                                <form className='w-full pt-4' onSubmit={handleGenerate}>
                                    <div className='flex'>
                                        <Card
                                            isFooterBlurred
                                            radius="lg"
                                            className="border-none max-w-fit"
                                        >
                                            <Image
                                                alt="Woman listing to music"
                                                className="object-cover"
                                                height={70}
                                                src="https://nextui.org/images/hero-card.jpeg"
                                                width={70}
                                            />
                                        </Card>
                                        <Divider orientation="vertical" className='px-1' />
                                        <Card
                                            isFooterBlurred
                                            radius="lg"
                                            className="border-none max-w-fit"
                                        >
                                            <Image
                                                alt="Woman listing to music"
                                                className="object-cover"
                                                height={70}
                                                src="https://nextui.org/images/hero-card.jpeg"
                                                width={70}
                                            />
                                        </Card>
                                        <Divider orientation="vertical" className='px-1' />
                                        <Card
                                            isFooterBlurred
                                            radius="lg"
                                            className="border-none max-w-fit"
                                        >
                                            <Image
                                                alt="Woman listing to music"
                                                className="object-cover"
                                                height={70}
                                                src="https://nextui.org/images/hero-card.jpeg"
                                                width={70}
                                            />
                                        </Card>
                                        <Divider orientation="vertical" className='px-1' />
                                        <Card
                                            isFooterBlurred
                                            radius="lg"
                                            className="border-none max-w-fit"
                                        >
                                            <Image
                                                alt="Woman listing to music"
                                                className="object-cover"
                                                height={70}
                                                src="https://nextui.org/images/hero-card.jpeg"
                                                width={70}
                                            />
                                        </Card>
                                    </div>
                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="small_size">Base Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="small_size" type="file" />
                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="small_size">Style Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="small_size" type="file" />
                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="small_size">Identity Image</label>
                                    <input className="block w-full p-2 mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="small_size" type="file" />
                                    <label className="block mb-1 text-sm font-medium text-gray-900 pt-3" htmlFor="small_size">Composition Image</label>
                                    <input className="block w-full p-2 mb-4 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="small_size" type="file" />
                                    <Button type="submit" color="primary" variant="solid" className='text-white px-10 mt-4'>
                                        Generate
                                    </Button>
                                </form>
                            </CardHeader>
                        </Card>
                    </CardHeader>
                    <small className="text-default-500 px-7 pt-5"> <strong>Hint: </strong>Upload the high quality image will have high quality result</small>
                </Card>
                {/* OUTPUT */}
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
                        <p className="text-tiny uppercase font-bold pb-5">Output</p>
                        <Card className='w-full texture ' isBlurred>
                            <div className='w-full'>
                                <div className='relative' style={{ paddingBottom: 'calc(1024 / 960 * 100%)' }}>
                                    {generatedImage ? (
                                        <img
                                            src={generatedImage}
                                            alt="Generated image"
                                            className="object-cover w-full h-full absolute top-0 left-0"
                                        />
                                    ) : (<div className="w-full h-full absolute top-0 left-0  flex items-center justify-center">
                                        <p className="text-gray-400">Waiting for your input ... </p>
                                    </div>)}
                                </div>
                            </div>
                        </Card>
                        {generatedImage ? (
                            <div>
                                <Divider orientation='horizontal' className='my-2' />
                                <div className='flex gap-x-2'>
                                    <Button color="primary" variant="faded" className='pt-'>
                                        Open
                                    </Button>
                                    <Button color="primary" variant="faded" className='pt-'>
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ) : (<small className="text-default-500 px-2 pt-5">Credit will be reduce once inference is done.</small>)}
                    </CardHeader>
                </Card>
            </div>

        </>
    )
}

export default DashboardPage