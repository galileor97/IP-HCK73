import React from 'react'
import { Chip } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";


const DashboardPage = () => {
    return (
        <>
            <Card className="max-w-full texture px-3 lg:px-24" radius='none'>
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
                        Visit source on GitHub.
                    </Link>
                </CardBody>

            </Card>
            <Divider />

        </>
    )
}

export default DashboardPage