import { fetchFilteredCustomers, fetchCustomersPages } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({ searchParams }: { searchParams?: {
    query?: string;
    page?: string;
}}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchCustomersPages(query);
    const customers = await fetchFilteredCustomers(query, currentPage);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Search customers..." />
                    {/* <CreateCustomer /> */}
                    <div className="rounded-md bg-blue-400 hover:bg-blue-600 cursor-pointer p-2">Create Customer</div>
                    </div>
                <Suspense key={query} fallback={<CustomersTableSkeleton />}>
                    <CustomersTable customers={customers} />
                </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
                            ;
}