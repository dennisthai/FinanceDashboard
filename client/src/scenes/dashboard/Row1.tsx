import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";

type Props = {}

const Row1 = (props: Props) => {
    const { palette } = useTheme();
    const { data } = useGetKpisQuery();
    console.log("data:", data);
    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses,
                };
            })
        );
    }, [data]);

    return (
        <> 
            <DashboardBox bgcolor="#fff" gridArea="a">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorRevenue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="b"></DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="c"></DashboardBox>
        </>
        )
}

export default Row1