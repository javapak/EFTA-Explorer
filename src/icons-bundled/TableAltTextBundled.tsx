import {bundleIcon ,TableAltTextRegular, TableAltTextFilled } from '@fluentui/react-icons'
import type { SVGAttributes } from 'react';

const BundledIco = bundleIcon(TableAltTextFilled, TableAltTextRegular);
export default function TableAltTextBundled(props: SVGAttributes<SVGElement>) {
    return <BundledIco {...props} />;
}