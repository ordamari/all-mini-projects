import { useEffect, useRef, useState } from "react";
import { InfinityScroll } from "../../components/InfinityScroll";
import { SearchInput } from "../../components/SearchInput";
import { imageService } from "../../services/imageService";
import { ImageContainer } from "./components/ImageContainer";

export function PageInfinityScroll({ }) {

    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const [isHasMore, setIsHasMore] = useState(false);
    const lastQuery = useRef('');

    useEffect(() => {
        loadImages();
    }, [query])



    const loadImages = async () => {
        if (!query) {
            setIsHasMore(false);
            setImages([]);
            setPage(1)
        } else {
            if (query === lastQuery.current) {
                const res = await imageService.get(query, page)
                setIsHasMore(res.results.length > 0)
                if (res.results.length > 0) setPage(prev => prev + 1)
                setImages(prev => [...prev, ...res.results])
            } else {
                lastQuery.current = query
                const res = await imageService.get(query, 1)
                setIsHasMore(res.results.length > 0)
                setImages([...res.results])
                setPage(2)
            }
        }
    }


    return (
        <div className="infinity-scroll-page page ">
            <div className="flex justify-space-between align-center infinty-scroll-header">
                <SearchInput
                    onChange={setQuery}
                />

                <span>Power by Unsplush</span>
            </div>
            <InfinityScroll
                cb={loadImages}
                isHasMore={isHasMore}
            >
                <div className="images-container" >
                    {
                        images.map(image =>
                            <ImageContainer
                                key={image.id}
                                src={image.urls.full}
                                alt={image.alt_description}
                                thumbSrc={image.urls.thumb}
                                aspectRatio={`${image.width}/${image.height}`}
                            />
                        )
                    }
                </div>

            </InfinityScroll>
        </div>
    )
}