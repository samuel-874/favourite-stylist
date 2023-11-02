import { Filter, GroupGrid, List, LocationIcon, SearchIcon, SortLocation } from "../../react-icons/Icons"
import { Greating,  SearchBar, StyledHome,  BarSection } from "./Home.styles"
import { useState, useEffect, createContext, } from "react";
import { HomeInfo } from "./HomeInfo";
import { SearchPage } from "./SearchPage";
import {  useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import { RecommendedStylist } from "./RecommendedStylist";
import { FilterType, Staged } from "../../types/appTypes";
import { StylistShortDetails } from "../details/stylist/StylistShortDetails";
import { FilterBoard } from "../../general/GeneralComponents";

export const FilterContext = createContext<FilterType|undefined>(undefined);
export const StylistContext = createContext<Staged|undefined>(undefined);


export const Home  = () => {

  const params =  new URLSearchParams(window.location.search);
  const searchIndex = params.get("index");
  const [ stagedStylist, setStagedStylist ] = useState({show:false,id:0});

  const [ showFilter,toggleShowFilter ] = useState(false);
  const [ _ , setSearchParams ] = useSearchParams();
  const userInfo = useAppSelector(state => state.userInfo)
  const [ index, setIndex ] = useState(0);
  const [ searchQuery, updateSearchQuery ] = useState("");
  const [ itemsFilter , updateItemsFilter ] = useState({
    display:"grid",
    filter:{
      certification:"",
      worksWithKids:true,
      curlySistersStylist:true,
      colorHairStylist:true,
      hairType:"",
      seeAll:true
    }
  });


  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(searchQuery.trim().length > 0){
        const params = new URLSearchParams();
        params.set("search_query", searchQuery);
        params.set("index", "1");
        setSearchParams(params);
      }

  }

  const updateSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateSearchQuery(e.target.value)
  }

  
  window.addEventListener("resize",()=>{
      if(window.innerWidth < 600){
        if(itemsFilter?.display !== "grid"){
          updateItemsFilter((oldData)=>{
            return {
              ...oldData,
              display:"grid"
            }
          })
        }
      }
  })

  
  useEffect(()=>{
      const number = parseInt(searchIndex||"0");
      setIndex(number);
  },[params])


    return (
      <StyledHome>
        <div>
          <Greating>
            Welcome <strong>{userInfo.firstname},</strong> 
            <p>Let’s Find You A Stylist</p>
          </Greating>
          <BarSection>
              <SearchBar  onSubmit={handleSubmit}>
                 <SearchIcon />
                  <input 
                    type="text" 
                    name="stylist_search" 
                    value={searchQuery} 
                    onChange={updateSearch} 
                    placeholder="What city are you located in?"
                  />
                  <button type="submit">
                    <LocationIcon />
                  </button>           
              </SearchBar>
              { index != 0 &&
              <span>
                <div onClick={()=>updateItemsFilter((oldItem)=>{
                    return {
                     ...oldItem,
                        display:"grid"
                  }})}>
                    <GroupGrid isGrid={itemsFilter.display === "grid"} />
                </div>
                <div onClick={()=>updateItemsFilter((oldItem)=>{
                      return {
                        ...oldItem,
                        display:"list"
                    }})}>
                    <List isList={itemsFilter.display === "list"} />
                </div> 
                <button>
                  <SortLocation />
                </button>
                <data onClick={()=>toggleShowFilter(true)}>
                 <Filter />
                </data>
              </span>
              }
          </BarSection>
        </div>
        <StylistContext.Provider value={{stagedStylist,setStagedStylist}}>
            <FilterContext.Provider value={{itemsFilter,updateItemsFilter}}>
              { index === 0 
                ?
                <HomeInfo />
                :( index === 1 
                  ? <SearchPage />
                  : <RecommendedStylist />)
                }
            </FilterContext.Provider>
        </StylistContext.Provider>
       { stagedStylist.show && <StylistShortDetails stylistId={stagedStylist.id} updateShow={setStagedStylist}  />}
       {showFilter && <FilterBoard toggleShow={toggleShowFilter} />}
      </StyledHome>
    )
}