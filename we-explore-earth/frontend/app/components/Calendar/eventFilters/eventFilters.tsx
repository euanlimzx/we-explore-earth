import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'expo-checkbox';
import { styles } from './styles'

function FilterHeader(
    {
        header,
        selectedOptions,
        setSelectedOptions,
    }
    :
    {
        header: string,
        selectedOptions: Record<string, boolean>,
        setSelectedOptions: React.Dispatch<any>
    }
){
    const handleReset = () => {
        const clearedSelections = Object.fromEntries(
            Object.entries(selectedOptions).map(([key]) => [key, false])
        );
        setSelectedOptions(clearedSelections);
    }

    return(
        <View style={styles.filterHeaderWrapper}>
            <Text style={styles.filterHeader}>{header}</Text>
            <TouchableOpacity onPress={handleReset}>
                <Text style={styles.reset}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

function FilterOption(
    {
        option,
        selectedOptions,
        setSelectedOptions
    }
    :
    {
        option: string,
        selectedOptions: Record<string, boolean>,
        setSelectedOptions: React.Dispatch<any>
    }
){
    const handleCheck = () => {
        // handle unchecking the box
        if(selectedOptions[option]) {
            setSelectedOptions({...selectedOptions, [option]: false});
        }
        // handle checking the box
        else {
            setSelectedOptions({...selectedOptions, [option]: true});
        }
    }

    return(
        <View style={styles.filterOptionWrapper}>
            <Text style={styles.filterOption}>{option}</Text>
            <Checkbox
                value={selectedOptions[option]}
                onValueChange={handleCheck}
                color={selectedOptions[option] ? 'black' : 'mediumgrey'}
            />
        </View>
    )
}

function EventFilters() {
    const [dateOptions, _] = useState<Array<string>>(['Today', 'Tomorrow', 'This Week', 'This Month']);
    const [selectedDates, setSelectedDates] = useState<Record<string, boolean>>({});

    const [categoryOptions, setCategoryOptions] = useState<Array<string>>([]);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

    const handleSubmit = () => {
        // Compute start and end dates.
        let startDate : Date | null = null;
        let endDate : Date | null = null;
        const today = new Date();
        for (const [option, isSelected] of Object.entries(selectedDates)) {
            if (!isSelected) {
                continue;
            }
            let newStartDate : Date = new Date();
            let newEndDate : Date = new Date();
            switch (option) {
                case 'Today':
                    break;
                case 'Tomorrow':
                    newStartDate.setDate(today.getDate() + 1);
                    newEndDate.setDate(today.getDate() + 1);
                    break;
                case 'This Week':
                    const day = today.getDay();
                    newStartDate.setDate(today.getDate() - day);    // Start of the week (Sunday)
                    newEndDate.setDate(today.getDate() + (6-day));  // End of the week (Saturday)
                    break;
                case 'This Month':
                    newStartDate.setDate(1);  // First day of the month
                    const numberOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                    newEndDate.setDate(numberOfDays); // Last day of the month
                default:
                    break;
            }
            startDate = startDate ? new Date(Math.min(startDate.getTime(), newStartDate!.getTime())) : newStartDate;
            endDate = endDate ? new Date(Math.max(endDate.getTime(), newEndDate!.getTime())) : newEndDate;
        }

        console.log('start date', startDate?.toString());
        console.log('end date:', endDate?.toString());
        const cats = [];
        for (const [option, isSelected] of Object.entries(selectedCategories)) {
            if (isSelected){
                cats.push(option);
            }
        }
        console.log(cats);
        // TODO: Pass the filter values (startDate, endDate, categories) to parent component.
    }

    async function retrieveCategories() {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/config/categories`, { method: 'GET' });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || "Failed to fetch categories");
            }

            setCategoryOptions(data);
        }
        catch (error: any) {
            console.log(error instanceof Error ? error.message : "Failed to fetch categories");
        }
    }

    useEffect(() => {
        // initially, all date options are unselected
        const initSelectedDates : Record<string, boolean> = {};
        dateOptions.forEach((date) => {
            initSelectedDates[date] = false;
        });
        setSelectedDates(initSelectedDates);
        
        // grab categories from backend
        retrieveCategories();

        // initially, all category options are unselected
        const initSelectedCategories : Record<string, boolean> = {};
        categoryOptions.forEach((category) => {
            initSelectedCategories[category] = false;
        });
        setSelectedCategories(initSelectedCategories);
    }, []);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 20, paddingHorizontal: 20}}>
            <View>
                <Text style={styles.filterTitle}>Filter</Text>
                {dateOptions && dateOptions.length >= 0 &&
                    <>
                        <FilterHeader
                            header='Date'
                            selectedOptions={selectedDates}
                            setSelectedOptions={setSelectedDates}
                        />
                        {dateOptions.map((option, index) => 
                            <FilterOption
                                key={index}
                                option={option}
                                selectedOptions={selectedDates}
                                setSelectedOptions={setSelectedDates}
                            />
                        )}
                    </>
                }
                {categoryOptions && categoryOptions.length >= 0 &&
                    <>
                        <FilterHeader
                            header='Category'
                            selectedOptions={selectedCategories}
                            setSelectedOptions={setSelectedCategories}
                        />
                        {categoryOptions.map((option, index) => 
                            <FilterOption
                                key={index}
                                option={option}
                                selectedOptions={selectedCategories}
                                setSelectedOptions={setSelectedCategories}
                            />
                        )}
                    </>
                }
                <TouchableOpacity
                    style={styles.submit}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default EventFilters;